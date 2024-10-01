import mongoose, {Schema, Document} from "mongoose";

interface ICurlCommand extends Document {
    url:string;
    headers:Record<string, string>, 
    body: Record<string, any> | null,
    method: string
}

const CurlCommandSchema: Schema = new Schema({
    url: {type:String, required:true}, 
    headers: {type:Map,of: String, required:true}, 
    body: {type:Object},
    method: {type:String}
});

export const CurlCommand = mongoose.model<ICurlCommand>('CurlCommand', CurlCommandSchema)