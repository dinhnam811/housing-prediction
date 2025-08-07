import { Link } from 'react-router-dom';
import {Paper, Typography, Container, Box, Button} from '@mui/material';


function Home() {

    const infoPanelData = [
        {
            title: 'Suburb Livability',
            content: 'Discover job diversity and employability predictions within your selected suburb.',
            link: '/liveable',
        },
        {
            title: 'Price by Geography',
            content: 'Get predictions for maximum housing prices based on distance from Melbourne CBD.',
            link: '/maximum-price',
        },
        {
            title: 'Suburb Suggester',
            content: 'Access suburb suggestions tailored to your budget and ideal land size.',
            link: '/suburb-model',
        },
    ];

    return (

        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: 4,
            marginBottom: 6,
            height: 'auto',
            backgroundColor: '#f5f5f5',
        }}>
            <Container component="main" sx={{ marginTop: 4, marginBottom: 2, textAlign: "center"}}>
                <Typography variant="h2" component="h1" gutterBottom>
                    La Vaguelette
                </Typography>
                <Typography variant="h2" component="h1" gutterBottom>
                    AI Housing Prediciton Tool
                </Typography>
                <Typography variant="h5" component="h2" gutterBottom>
                    House hunting made easy with AI.
                </Typography>
            </Container>
            {/* Option Panels*/}
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginTop: 4,
                    width: '100%',
                    maxWidth: '1200px',
                }}
            >
                {infoPanelData.map((panel, index) => (
                    <Paper
                        key={index} // use index as key

                        // styling for panels
                        sx={{
                            flex: 1,
                            margin: 1,
                            paddingTop: 2, 
                            paddingBottom: 3, 
                            paddingLeft: 4, 
                            paddingRight: 4,
                            textAlign: 'center',
                            backgroundColor: '#fff',
                            boxShadow: 3,
                        }}
                    >
                        <Typography variant="h6" component="h2" gutterBottom sx={{ fontWeight: 'bold' }}>
                            {panel.title}
                        </Typography>
                        <Typography variant="body1">
                            {panel.content}
                        </Typography>
                        <Button
                            variant="contained"
                            color="primary"
                            component={Link} 
                            to={panel.link} // link to specific service's page
                            sx={{ marginTop: 2 }} // spacing
                        >
                            Use Tool
                        </Button>
                    </Paper>
                ))}
            </Box>
        </Box>
    );
}

export default Home;