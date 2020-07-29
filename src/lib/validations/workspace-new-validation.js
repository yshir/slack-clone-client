import Ajv from 'ajv'

export const createValidator = ({ workspaceNames }) => {
  const ajv = new Ajv({ allErrors: true })
  const validate = ajv.compile({
    type: 'object',
    properties: {
      workspaceName: {
        type: 'string',
        minLength: 1,
        maxLength: 30,
        not: {
          enum: workspaceNames,
        },
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
  })
  return validate
}
