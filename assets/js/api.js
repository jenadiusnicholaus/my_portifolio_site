class Api {
     static getProjects = async () => {
       const headers = new Headers();
       headers.append('Content-Type', 'application/json');
       const requestOptions = { method: 'GET', redirect: 'follow', headers };
       const response = await fetch('http://jenadiusnicholausportifolio.pythonanywhere.com/api/projects/', requestOptions);
       try {
         if (response.ok) {
           const decodedResponse = await response.json();
           const projects = decodedResponse.results;
           return projects;
         }

         return response;
       } catch (e) {
         return e;
       }
     }
}

export default Api;