 import { LoopbackConnector } from "@goatlab/fluent/dist/Providers/Loopback/LoopbackConnector";
 import { FormDtoIn } from "@goatlab/fluent/dist/core/Nestjs/Form/form.dto";
 
 export const Form = new LoopbackConnector<FormDtoIn>({
   baseEndPoint: `${String(process.env.REACT_APP_FLUENT_BASE_URL)}/forms`,
 });
