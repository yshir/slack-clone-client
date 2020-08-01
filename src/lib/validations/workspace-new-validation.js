import Ajv from 'ajv'

export const createValidator = ({ workspaceNames }) => {
  const ajv = new Ajv({ allErrors: true })
  const schema = {
    type: 'object',
    properties: {
      workspaceName: {
        type: 'string',
        minLength: 1,
        maxLength: 30,
      },
      username: {
        type: 'string',
        minLength: 1,
        maxLength: 30,
      },
      password: {
        type: 'string',
        minLength: 6,
        maxLength: 255,
      },
    },
    required: ['workspaceName', 'username', 'password'],
  }
  if (workspaceNames && workspaceNames.length > 0) {
    schema.properties.workspaceName.not = {
      enum: workspaceNames,
    }
  }
  const validate = ajv.compile(schema)
  return validate
}
