import Box from '@mui/material/Box';
import Lottie from 'react-lottie';
import animation from './lotties/bicep_curl.json';

export default function Home() {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animation,
        rendererSettings: {
            perserveAspectRatio: "xMidYMid slice"
        }
    };
    return (
        <Box>
            <h1>Welcome to ratemygym!</h1>
            <Lottie options={defaultOptions} height={100} width={100}/>
        </Box>
    )
}