import { Router} from "express";
import * as CompaniesControllers from './companies.controllers'
import Company from "./companies.model";
import { validateRequest } from "../../middlewares";
import { ParamsWithId } from "../../interfaces/ParamsWithId";

const router = Router();



router.get('/', CompaniesControllers.findAll);

router.get(
    '/:id', 
    validateRequest({
        params: ParamsWithId,
    }), 
    CompaniesControllers.findOne,
);

router.post('/', validateRequest({
    body: Company,
}), CompaniesControllers.createOne);

router.put(
    '/:id',
    validateRequest({
      params: ParamsWithId,
      body: Company,
    }),
    CompaniesControllers.updateOne,
  );

router.delete(
    '/:id', 
    validateRequest({
        params: ParamsWithId,
    }), 
    CompaniesControllers.deleteOne,
);


export default router;  