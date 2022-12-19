import { useAuth0 } from "@auth0/auth0-react";


const LoginButton = () => {
    const { loginWithRedirect } = useAuth0();
  
    return <button className="border solid-2 border-black rounded-md w-20 self-center bg-green-500" onClick={() => loginWithRedirect()}>Log In</button>;
    
  };
  
  export default LoginButton;