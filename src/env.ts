// Libraries
import Joi from "joi";

const schema = Joi.object({
  SERVER: Joi.string().hostname().default("localhost"),
  WS_PORT: Joi.number().port().required(),
  BROADCAST_AUTHORIZATION: Joi.string().required(),
})
  .unknown(true)
  .required();

const { error, value } = schema.validate(process.env);

if (error) {
  console.log(`❌ Variável ambiente ${error.details[0].path} não encontrada.`);
  process.exit(1);
}

export const env = value as Joi.extractType<typeof schema>;
