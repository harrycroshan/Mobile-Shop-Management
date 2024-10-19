import express from "express";
import { create,  deletedata,getAll,  Icreate,  idelete,  IgetAll,  iupdate,   shipsend, update} from "../controllers/record.controller.js";




const route = express.Router();

route.post("/create", create);
route.get("/getall", getAll);
route.put( '/updatee/:EId', update);
route.delete( '/delete/:EEEId', deletedata);


route.post("/icreate", Icreate);
route.get("/igetall", IgetAll);
route.put( '/iupdatee/:DDId', iupdate);
route.delete( '/idelete/:CCId', idelete);
route.post('/ship-email', shipsend);







export default route;