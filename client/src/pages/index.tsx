import HomeLayout from "@/components/layout/HomeLayout"
import styles from "../styles/pages/home.module.css"


export default function Home() {
      const createGame = () => {
        // Replace the URL with your Firebase Function endpoint
        const url = 'https://us-central1-southernrealms-f130b.cloudfunctions.net/helloWorld';

        fetch(url, {
            method: 'GET'  // or 'POST', depending on your function's setup
        })
        .then(response => {
            if (response.ok) return response.text();  // or response.json() if it returns JSON
            throw new Error('Network response was not ok.');
        })
        .then(data => {
            console.log('Response from function:', data);
        })
        .catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
        });
    };

  return <HomeLayout> 
  </HomeLayout>
}