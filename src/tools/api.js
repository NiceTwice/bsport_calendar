import axios from "axios";

const DEFAULT_COMPANY_ID = 6;

const token = "8c5ba20bc481c4d2803325833a5cf54771f6ba45";
axios.defaults.headers.common = {'Authorization': `Bearer ${token}`};

const get = (url, params) => {
  return axios.get(url, {
    params : params
  }).then(resp => {
    return resp.data;
  }).catch(err => {
    throw err;
  });
};

export const api = {
  offer: {
    search: ({company = DEFAULT_COMPANY_ID, date_start, date, min_date, max_date, page, page_size} = {}) => {
      return get('https://api.staging.bsport.io/api/v1/offer/', {
          company,
          date,
          min_date,
          max_date,
          date_start,
          page,
          page_size
        }
      )
    }
  },
  metaActivity: {
    search: ({company = DEFAULT_COMPANY_ID} = {}) => {
      return get('https://api.staging.bsport.io/api/v1/meta-activity/', {
        company
      })
    },
    get: ({id}) => {
      return get(`https://api.staging.bsport.io/api/v1/meta-activity/${id}`);
    }
  },
  coach: {
    search: ({company = DEFAULT_COMPANY_ID} = {}) => {
      return get('https://api.staging.bsport.io/api/v1/coach/', {
        company
      })
    },
    get: ({id}) => {
      return get(`https://api.staging.bsport.io/api/v1/coach/${id}`);
    }
  },
  establishment: {
    search: ({company = DEFAULT_COMPANY_ID} = {}) => {
      return get('https://api.staging.bsport.io/api/v1/establishment/', {
        company
      })
    },
    get: ({id}) => {
      return get(`https://api.staging.bsport.io/api/v1/establishment/${id}`)
    }
  },
  establishmentLocation: {
    search: ({company = DEFAULT_COMPANY_ID} = {}) => {
      return get('https://api.staging.bsport.io/api/v1/establishment/marker/', {
        company
      })
    }
  },
  booking: {
    search: ({offer_id, page, page_size} = {}) => {
      return get('https://api.staging.bsport.io/api/v1/booking/', {
        offer: offer_id,
        page,
        page_size
      })
    }
  }
}

export default api;
