import { Router, Request, Response, NextFunction } from "express";
import { Companies, Company, CompanyWithId } from "./companies.model";
import { InsertOneResult, ObjectId } from "mongodb";
import { ZodError } from "zod";
import { ParamsWithId } from "../../interfaces/ParamsWithId";

export  const findAll = async (req: Request, res: Response<CompanyWithId[]>, next: NextFunction) =>{
    try {
        const result = await Companies.find();
        const companies = await result.toArray();
        res.json(companies);
    } catch (error) {
        next(error);
    }
};
 
export  const createOne = async (req: Request<{}, CompanyWithId, Company>, res: Response<CompanyWithId>, next: NextFunction) =>{
    try {
        const insertResult = await Companies.insertOne(req.body);
        if(!insertResult.acknowledged) throw new Error('Error inserting');
        res.status(201);
        res.json({
            _id: insertResult.insertedId,
            ...req.body,
        })
    } catch (error) {
        if(error instanceof ZodError){
            res.status(422);
        }
        next(error);
    }
};
 
export const findOne = async (req: Request<ParamsWithId, CompanyWithId, {}>, res: Response<CompanyWithId>, next: NextFunction) => {
    try {
        const result = await Companies.findOne({
            _id: new ObjectId(req.params.id),
        });       
        if(!result){
            res.status(404);
            throw new Error(`Company with id "${req.params.id}"not found`);
        }
        res.json(result)
    } catch (error) {
        next(error);
    }
}

export const updateOne = async (req: Request<ParamsWithId, CompanyWithId, Company>, res: Response<CompanyWithId>, next: NextFunction) => {
    try {
      const result = await Companies.findOneAndUpdate({
        _id: new ObjectId(req.params.id),
      }, {
        $set: req.body,
      }, {
        returnDocument: 'after',
      });
      if (!result.value) {
        res.status(404);
        throw new Error(`Company with id "${req.params.id}" not found.`);
      }
      res.json(result.value);
    } catch (error) {
      next(error);
    }
  }

  export const deleteOne = async (req: Request<ParamsWithId, {}, {}>, res: Response<{}>, next: NextFunction) => {
    try {
      const result = await Companies.findOneAndDelete({
        _id: new ObjectId(req.params.id),
      });
      if (!result.value) {
        res.status(404);
        throw new Error(`Todo with id "${req.params.id}" not found.`);
      }
      res.status(204).end();
    } catch (error) {
      next(error);
    } 
  }