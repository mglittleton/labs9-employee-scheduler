import axios from 'axios'

export const FETCH_EMPLOYEES_FROM_DB_SUCCESS = 'FETCH_EMPLOYEES_FROM_DB_SUCCESS'
export const FETCH_EMPLOYEES_FROM_DB_FAIL = 'FETCH_EMPLOYEES_FROM_DB_FAIL'
export const FETCH_EMPLOYEE_FROM_DB_SUCCESS = 'FETCH_EMPLOYEE_FROM_DB_SUCCESS'
export const FETCH_EMPLOYEE_FROM_DB_FAIL = 'FETCH_EMPLOYEE_FROM_DB_FAIL'

const baseURL = process.env.REACT_APP_SERVER_URL

// the id here is for testing purposes. eventually it will be known on the backend based on the user's auth
export const fetchEmployeesFromDB = (
  orgId = '21e4c744-9fc0-45d9-af6b-3ed2776c1bfe'
) => dispatch => {
  if (orgId) {
    axios
      .get(`${baseURL}/employees/${orgId}`, {
        headers: { authorization: 'testing' }
      })
      .then(res => {
        dispatch({
          type: FETCH_EMPLOYEES_FROM_DB_SUCCESS,
          payload: res.data
        })
      })
      .catch(error => dispatch({ type: FETCH_EMPLOYEES_FROM_DB_FAIL }))
  } else {
    // will probably roll both these routes into one once auth is up and running
    // for now just gonna leave this one here, leave it "decommissioned"
    axios
      .get(`${baseURL}/users/`, { headers: { authorization: 'testing' } })
      .then(res => {
        dispatch({
          type: FETCH_EMPLOYEES_FROM_DB_SUCCESS,
          payload: res.data
        })
      })
      .catch(error => {
        console.log(error)
        dispatch({ type: FETCH_EMPLOYEES_FROM_DB_FAIL })
      })
  }
}

// fetches a single employee by user id
export const fetchSingleEmployeeFromDB = userid => dispatch => {
  axios
    .get(`${baseURL}/dashboard/${userid}`, {
      headers: { authorization: 'testing' }
    })
    .then(res =>

      dispatch({
        type: FETCH_EMPLOYEE_FROM_DB_SUCCESS,
        payload: res.data
      })
    )
    .catch(error =>
      dispatch({
        type: FETCH_EMPLOYEE_FROM_DB_FAIL
      })
    )
}
