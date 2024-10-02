import { Types } from "mongoose";
import { NextFunction } from "express";
import { collection } from "../../models/apiCollection";
import { CurlCommand } from "../../models/curlCommand";

export const deleteAPIfromAllCollections = async (id:string) => {
   try{
    const result = await collection.updateMany(
        {}, 
        {$pull: {apis:{api:id}}}
    )
    console.log(`${id} api is deleted from all the collections.Deleted Count: ${result.modifiedCount}`)
    return result
   } 
   catch(error){
    console.error(`error while deleting the ${id} api from collections`, error)
}

}


export const updateAPIfromAllCollection = async(id: string, newInterval: string) => {
    try{
        const result =  await collection.updateMany(
          { 'apis.api': id },
          {
            $set: { 'apis.$.interval': newInterval },
          }
        )
        console.log(
          `${id} api is updated from all the collections.Updated Count: ${result.modifiedCount}`
        )
        return result;
    }
    catch(error)
    {
        console.error(`error while updating the ${id} api from collections`, error)
    }
}