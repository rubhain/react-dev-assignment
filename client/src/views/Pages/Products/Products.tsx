import React, { useEffect, useState } from "react";
import { Button, Popconfirm, Select, Table } from "antd";
import { DataType, EditableCell, EditableRow } from "../Companies/Companies";
import { useDispatch, useSelector } from "react-redux";
import {
  addProduct,
  deleteProduct,
  updateProduct,
} from "../../../storage/productsSlice";
import { nanoid } from "@reduxjs/toolkit";
import { fetchCompanies } from "../../../storage/companiesSlice";

type EditableTableProps = Parameters<typeof Table>[0];

interface ProductDataType {
  productId: string;
  productName: string;
  category: string;
  amount: string;
  unit: string;
  _id: string;
}

type ColumnTypes = Exclude<EditableTableProps["columns"], undefined>;

const Products: React.FC = () => {
  const data: DataType[] = useSelector(
    (state: any) => state.companies
  ).companies;

  const productsData: DataType[] = useSelector(
    (state: any) => state.products
  ).products;

  const [productCompany, setProductCompany] = useState("");
  console.log(productCompany);

  const companyArray = data.map((item: DataType) => {
    const optionValue = { value: item._id, label: item.companyName };
    return optionValue;
  });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCompanies());
  }, [dispatch]);

  const handleDelete = (productId: string) => {
    dispatch(deleteProduct(productId));
  };

  const defaultColumns: (ColumnTypes[number] & {
    editable?: boolean;
    dataIndex: string;
  })[] = [
    {
      title: "Product Name",
      dataIndex: "productName",
      width: "30%",
      editable: true,
    },
    {
      title: "Product Category",
      dataIndex: "category",
      editable: true,
    },
    {
      title: "Product Amount",
      dataIndex: "amount",
      editable: true,
    },
    {
      title: "Amount Unit",
      dataIndex: "unit",
      editable: true,
    },
    {
      title: "Company",
      dataIndex: "_id",
    },
    {
      title: "operation",
      dataIndex: "operation",
      render: (_, record: { productId: string }) =>
        productsData.length >= 1 ? (
          <Popconfirm
            title="Sure to delete?"
            onConfirm={() => handleDelete(record.productId)}
          >
            <a>Delete</a>
          </Popconfirm>
        ) : null,
    },
  ];

  const handleAdd = () => {
    const newData: ProductDataType = {
      productId: `${nanoid(5)}`,
      productName: "Phone",
      category: "Tech",
      amount: "15",
      unit: "asd",
      _id: `${productCompany}`,
    };
    dispatch(addProduct(newData));
    console.log(newData);
  };

  const handleSave = (row: ProductDataType) => {
    const newData = [...productsData];
    const index = newData.findIndex(
      (item: any) => row.productId === item.productId
    );
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    dispatch(updateProduct(newData));
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
      <Select
        defaultValue={companyArray[0]}
        style={{ width: 120 }}
        onChange={(value: any) => {
          setProductCompany(value);
          console.log(value);
        }}
        options={companyArray}
      />
      <Table
        components={components}
        rowClassName={() => "editable-row"}
        bordered
        dataSource={productsData}
        columns={columns as ColumnTypes}
      />
    </div>
  );
};

export default Products;
