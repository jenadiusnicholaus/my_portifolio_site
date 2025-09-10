class Api {
     static getProjects = async () => {
       const headers = new Headers();
       headers.append('Content-Type', 'application/json');
       const requestOptions = { method: 'GET', redirect: 'follow', headers };
       const response = await fetch('https://jenadiusnicholausportifolio.pythonanywhere.com/api/projects/', requestOptions);
       try {
         if (response.ok) {
           const decodedResponse = await response.json();
           return decodedResponse; // Return the full response object with results array
         }

         return null;
       } catch (e) {
         console.error('API Error:', e);
         return null;
       }
     }
}

export default Api;