import React, { useContext, useEffect, useRef, useState } from "react";
import type { InputRef } from "antd";
import { Button, Form, Input, Popconfirm, Table } from "antd";
import type { FormInstance } from "antd/es/form";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCompanies,
  addCompany,
  deleteCompany,
  updateCompany,
} from "../../../storage/companiesSlice";
import { RedoOutlined } from "@ant-design/icons";

const EditableContext = React.createContext<FormInstance<any> | null>(null);

interface Item {
  _id: string;
  companyName: string;
  legalNumber: number;
  country: string;
  website: string;
}

interface EditableRowProps {
  index: number;
}

const EditableRow: React.FC<EditableRowProps> = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

interface EditableCellProps {
  title: React.ReactNode;
  editable: boolean;
  children: React.ReactNode;
  dataIndex: keyof Item;
  record: Item;
  handleSave: (record: Item) => void;
}

const EditableCell: React.FC<EditableCellProps> = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef<InputRef>(null);
  const form = useContext(EditableContext)!;

  useEffect(() => {
    if (editing) {
      inputRef.current!.focus();
    }
  }, [editing]);

  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({ [dataIndex]: record[dataIndex] });
  };

  const save = async () => {
    try {
      const values = await form.validateFields();

      toggleEdit();
      handleSave({ ...record, ...values });
    } catch (errInfo) {
      console.log("Save failed:", errInfo);
    }
  };

  let childNode = children;

  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{ margin: 0 }}
        name={dataIndex}
        rules={[
          {
            required: true,
            message: `${title} is required.`,
          },
        ]}
      >
        <Input ref={inputRef} onPressEnter={save} onBlur={save} />
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{ paddingRight: 24 }}
        onClick={toggleEdit}
      >
        {children}
      </div>
    );
  }

  return <td {...restProps}>{childNode}</td>;
};

type EditableTableProps = Parameters<typeof Table>[0];

interface DataType {
  _id: string;
  companyName: string;
  legalNumber: number;
  country: string;
  website: string;
}

interface NewDataType {
  companyName: string;
  legalNumber: number;
  country: string;
  website: string;
}

type ColumnTypes = Exclude<EditableTableProps["columns"], undefined>;

const App: React.FC = () => {
  const data: DataType[] = useSelector(
    (state: any) => state.companies
  ).companies;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCompanies());
  }, [dispatch]);

  //DELETE
  const handleDelete = (_id: string) => {
    dispatch(deleteCompany(_id));
  };

  const defaultColumns: (ColumnTypes[number] & {
    editable?: boolean;
    dataIndex: string;
  })[] = [
    {
      title: "Company Name",
      dataIndex: "companyName",
      width: "30%",
      editable: true,
    },
    {
      title: "Company Legal Number",
      dataIndex: "legalNumber",
      editable: true,
    },
    {
      title: "Incorporation Country",
      dataIndex: "country",
      editable: true,
    },
    {
      title: "Website",
      dataIndex: "website",
      editable: true,
    },
    {
      title: "operation",
      dataIndex: "operation",
      render: (_, record: { _id: string }) =>
        data.length >= 1 ? (
          <Popconfirm
            title="Sure to delete?"
            onConfirm={() => handleDelete(record._id)}
          >
            <a>Delete</a>
          </Popconfirm>
        ) : null,
    },
  ];
  //POST
  const handleAdd = () => {
    const newData: NewDataType = {
      companyName: "Test Company",
      legalNumber: 777777,
      country: "Somewhere",
      website: "www.website.com",
    };
    dispatch(addCompany(newData));
  };
  //PUT
  const handleSave = (row: DataType) => {
    const newData = [...data];
    const index = newData.findIndex((item: DataType) => row._id === item._id);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    dispatch(updateCompany(newData[index]));
  };

  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };

  const columns = defaultColumns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: DataType) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave,
      }),
    };
  });

  return (
    <div>
      <Button onClick={handleAdd} type="primary" style={{ marginBottom: 16 }}>
        Add a row
      </Button>
      <Button
        onClick={() => dispatch(fetchCompanies())}
        type="primary"
        shape="circle"
        icon={<RedoOutlined />}
      />
      <Table
        components={components}
        rowClassName={() => "editable-row"}
        bordered
        dataSource={data}
        columns={columns as ColumnTypes}
      />
    </div>
  );
};

export default App;
