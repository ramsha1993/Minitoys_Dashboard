import api from '../api/axiosinterceptor';
import ENDPOINTS from '../utils/ENDPOINTS';




export async function fetchcapexCategories() {
   try {
      const response = await api.get({
        url: ENDPOINTS.OTHER.CAPEX_CATEGORIES,
      });
      if (response) {    
        console.log("test",response);
            
        return  response;
      }
    }
     catch (error) {
      console.error("Error fetching departments:", error);
    }
  
}

 export async function FetchbyId(endpoints,id){
    try {
      const response = await api.get({
        url: `${endpoints}/${id}`,
      });
      if (response) {    
        console.log("test",response);
            
        return  response;
      }
    } catch (error) {
      console.error("Error fetching departments:", error);
    }
  };

export async function Delete(endpoints,id) {
try {
      const response = await api.delete({
        url:`${endpoints}/${id}`,
      });
      if (response) {    
        console.log("delete single function",response);
            
        return  response;
      }
    }
     catch (error) {
      console.error("Error fetching departments:", error);
    }
}

export async function Update(endpoints,id) {
try {
      const response = await api.put({
        url:`${endpoints}/${id}`,
      });
      if (response) {    
        console.log("EDit single function",response);
            
        return  response;
      }
    }
     catch (error) {
      console.error("Error fetching departments:", error);
    }
}

export async function fetchDepartments(){
    try {
      const response = await api.get({
        url: ENDPOINTS.OTHER.DEPARTMENT,
      });
      if (response) {    
        console.log("test",response);
            
        return  response;
      }
    } catch (error) {
      console.error("Error fetching departments:", error);
    }
  };
  export async function fetchDepartmentid(id){
    try {
      const response = await api.get({
        url: `${ENDPOINTS.OTHER.DEPARTMENT}/${id}`,
      });
      if (response) {    
        console.log("test",response);
            
        return  response;
      }
    } catch (error) {
      console.error("Error fetching departments:", error);
    }
  };

export async function UpdateDept(id){
    try {
      const response = await api.put({
        url: `${ENDPOINTS.OTHER.DEPARTMENT}/${id}`,
      });
      if (response) {    
        console.log("test",response);
            
        return  response;
      }
    } catch (error) {
      console.error("Error fetching departments:", error);
    }
  };
    export  async function fetchusers(setusers){
  try {
      const response = await api.get({
        url: ENDPOINTS.OTHER.USERS_LIST,

      });
      if (response) {
        setusers(response);
        console.log("users",response)
      }
    } catch (error) {
      console.error("Error fetching departments:", error);
    }
  }
  
    export async function DeleteDepartment(dept_id){
    try {
      const response = await api.delete({
      url: `${ENDPOINTS.OTHER.DEPARTMENT}/${dept_id}`,
      });
      if (response) {
        console.log("delete",response)
      }
    } catch (error) {
      console.error("Error fetching departments:", error);
    }
  };