class Api {
     static getProjects = async () => {
      let headers = new Headers();
      headers.append("Content-Type", "application/json");
       const requestOptions = {method: 'GET',redirect: 'follow',headers: headers,
       }; 
       const response = await fetch('http://jenadiusnicholausportifolio.pythonanywhere.com/api/projects/', requestOptions);       
       try {
         if (response.ok) {
           const decodedResponse = await response.json();
           const projects = decodedResponse.results
           console.log(projects)
           return projects;
         }
         else{
          return response;

         }
       } catch (e) {
         return e;
       }
     }
}

export default Api;