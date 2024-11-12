import * as Yup from "yup";

export const addUser = {
  schema: {
    body: {
      yupSchema: Yup.object().shape({
        name: Yup.string().required(),
        email: Yup.string().email().required(),
        city: Yup.string(),
        country: Yup.string(),
      }),
    },
  },
};

export const updateUser = {
  schema: {
    body: {
      yupSchema: Yup.object().shape({
        name: Yup.string().required(),
        email: Yup.string().email().required(),
        city: Yup.string(),
        country: Yup.string(),
      }),
    },
  },
};
