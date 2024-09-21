import mongoose, {Schema, Document} from "mongoose";

interface ICurlCommand extends Document {
    url:string;
    headers:Record<string, string>, 
    body: Record<string, any> | null
}

const CurlCommandSchema: Schema = new Schema({
    url: {type:String, required:true}, 
    headers: {type:Map,of: String, required:true}, 
    body: {type:Object}
});

export const CurlCommand = mongoose.model<ICurlCommand>('CurlCommand', CurlCommandSchema)