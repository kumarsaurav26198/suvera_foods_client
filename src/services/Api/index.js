import axios from 'axios';
import { apiUri, baseURL } from '../apiEndPoints';

export const updateProfileApi = async (action) => {
  const { name, phoneNumber,
    email,
    oldPassword,
    authToken,
    newPassword } = action;
  const URL = `${ baseURL }${ apiUri.auth.update_user_details }`;

  const headers = {
    // 'x-city-id': '66883209127f2c4e8a136ef1',
    'Content-Type': 'application/json',
    Authorization: `Bearer ${ authToken }`,
  };

  const data = {
    name,
    phoneNumber,
    email,
    oldPassword,
    newPassword
  };
  console.log("updateProfileApi data===", data);

  console.log("updateProfileApi url", URL);
  //   console.log("updateProfileApi headers",headers)
  //   try {
  //     const response = await axios.post(URL, data, { headers });
  //     return response.data;

  //   } catch (error) {
  //     const errorPayload = {
  //       message: error?.response?.data?.message || error.message || 'Something went wrong!',
  //       status: error?.response?.status || null, // Capture HTTP status code if available
  //       response: error?.response
  //         ? {
  //             status: error.response.status,
  //             data: error.response.data,
  //             // Keep only serializable parts in the response object
  //             config: {
  //               method: error.response.config?.method,
  //               url: error.response.config?.url,
  //             },
  //           }
  //         : null,
  //     };

  //     throw errorPayload;
  //   }
};


export const updatePasswordApi = async (action) => {
  const { authToken,newPassword } = action;
  const URL = `${ baseURL }${ apiUri.auth.updatepassword }`;

  const headers = {
    // 'x-city-id': '66883209127f2c4e8a136ef1',
    'Content-Type': 'application/json',
    Authorization: `Bearer ${ authToken }`,
  };
  const data = {
    password: newPassword
  };
  try
  {
    const response = await axios.get(URL, data, { headers });
    return response.data;
  } catch (error)
  {
    const errorPayload = {
      message: error?.response?.data?.message || error.message || 'Something went wrong!',
      status: error?.response?.status || null, 
      response: error?.response
        ? {
          status: error.response.status,
          data: error.response.data,
          config: {
            method: error.response.config?.method,
            url: error.response.config?.url,
          },
        }
        : null,
    };

    throw errorPayload;
  }
};

export const placeOrderApiCall = async (authToken) => {
  const URL = `${ baseURL }${ apiUri.cart.placingOrder }`;
  const headers = {
    // 'x-city-id': '66883209127f2c4e8a136ef1',
    'Content-Type': 'application/json',
    Authorization: `Bearer ${ authToken }`,
  };
  console.log("URL=======>>",URL)
  try
  {
    const response = await axios.get(URL, { headers });
    // console.log("response=====>>", JSON.stringify(response));
    return response.data;

  } catch (error)
  {
    const errorPayload = {
      message: error?.response?.data?.message || error.message || 'Something went wrong!',
      status: error?.response?.status || null, // Capture HTTP status code if available
      response: error?.response
        ? {
          status: error.response.status,
          data: error.response.data,
          config: {
            method: error.response.config?.method,
            url: error.response.config?.url,
          },
        }
        : null,
    };

    throw errorPayload;
  }
};

export const UpdatePaymentMode = async (payload) => {
  const { authToken, paymentMethod } = payload;
  // console.log("payload",payload)
  const URL = `${ baseURL }${ apiUri.cart.updatePaymentMode }`;
  const headers = {
    // 'x-city-id': '66883209127f2c4e8a136ef1',
    'Content-Type': 'application/json',
    Authorization: `Bearer ${ authToken }`,
  };

  const data = {
    "paymentMethod": paymentMethod
  };

  // console.log("UpdatePaymentMode url", URL);
  // console.log("UpdatePaymentMode data===>", data);
  // console.log("UpdatePaymentMode headers", headers);
  try
  {
    const response = await axios.put(URL, data, { headers });
    // console.log("response=====>>",JSON.stringify(response))
    return response.data;
  } catch (error)
  {
    const errorPayload = {
      message: error?.response?.data?.message || error.message || 'Something went wrong!',
      status: error?.response?.status || null, // Capture HTTP status code if available
      response: error?.response
        ? {
          status: error.response.status,
          data: error.response.data,
          config: {
            method: error.response.config?.method,
            url: error.response.config?.url,
          },
        }
        : null,
    };
    throw errorPayload;
  }
};
export const UpdateCartAddress = async (payload) => {
  const { authToken, addressId } = payload;
  // console.log("payload",payload)
  const URL = `${ baseURL }${ apiUri.cart.applyCartAddress }`;
  const headers = {
    // 'x-city-id': '66883209127f2c4e8a136ef1',
    'Content-Type': 'application/json',
    Authorization: `Bearer ${ authToken }`,
  };

  const data = {
    "addressId": addressId
  };

  console.log("UpdateCartAddress url", URL);
  console.log("UpdateCartAddress data===>", data);
  // console.log("UpdatePaymentMode headers", headers);
  try
  {
    const response = await axios.post(URL, data, { headers });
    // console.log("response=====>>",JSON.stringify(response))
    return response.data;
  } catch (error)
  {
    const errorPayload = {
      message: error?.response?.data?.message || error.message || 'Something went wrong!',
      status: error?.response?.status || null, // Capture HTTP status code if available
      response: error?.response
        ? {
          status: error.response.status,
          data: error.response.data,
          config: {
            method: error.response.config?.method,
            url: error.response.config?.url,
          },
        }
        : null,
    };
    throw errorPayload;
  }
};