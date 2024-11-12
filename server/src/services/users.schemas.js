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

export const getUser = {
  schema: {
    params: {
      yupSchema: Yup.object().shape({
        id: Yup.number().required(),
      }),
    },
  },
};

export const deleteUser = {
  schema: {
    params: {
      yupSchema: Yup.object().shape({
        id: Yup.number().required(),
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

export const getAllUser = {
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
