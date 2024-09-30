import React from 'react';
import {HelpPageStyles} from './HelpPageStyles.tsx';
import {Box, Typography} from "@mui/material";

const HelpPage: React.FC = () => {
    return (
        <Box
            sx={{
                ...HelpPageStyles.container,
                height: `calc(100vh - 40px)`, // Assuming AppBar height is 40px
                overflowY: 'auto',
            }}
        >
            <Typography variant={"h1"} style={HelpPageStyles.title}>Help & Documentation</Typography>

            <Box style={HelpPageStyles.section}>
                <Typography variant="h4" style={HelpPageStyles.sectionTitle}>1. Getting Started</Typography>
                <Typography variant="body1" style={HelpPageStyles.description}>
                    Welcome to the LibYear Analyzer! This tool is designed to help you analyze the technical lag of your projects in a user-friendly way.
                    To get started, simply click on the "Get Started" button on the welcome page, which will guide you through the process of uploading your project files for analysis.
                </Typography>
            </Box >

            <Box style={HelpPageStyles.section}>
                <Typography variant="h4" style={HelpPageStyles.sectionTitle}>2. Buttons and Navigation</Typography>
                <Typography variant="body1" style={HelpPageStyles.description}>
                    - <strong>Get Started Button:</strong> This button, located on the Welcome Page, will take you to the file upload page where you can start analyzing your project.
                    <br />
                    - <strong>Dark Mode Toggle:</strong> Located in the top right corner of the Welcome Page, this button allows you to switch between light and dark mode for a more comfortable viewing experience.
                    <br />
                    - <strong>Upload Button:</strong> On the Drag-and-Drop page, this button will allow you to upload your project files for analysis.
                </Typography>
            </Box>

            <Box style={HelpPageStyles.section}>
                <Typography variant="h4" style={HelpPageStyles.sectionTitle}>3. Understanding the Statistics</Typography>
                <Typography variant="body1" style={HelpPageStyles.description}>
                    The LibYear Analyzer calculates several key metrics to help you understand the state of your project:
                    <br />
                    - <strong>LibYear:</strong> This metric calculates the age of each dependency in your project, based on how many years behind the latest version it is. A higher LibYear indicates a greater technical lag.
                    <br />
                    - <strong>Dependency Tree:</strong> The analyzer visualizes your project’s dependencies in a tree structure, showing which dependencies are out of date and how far behind they are.
                </Typography>
            </Box>

            <Box style={HelpPageStyles.section}>
                <Typography variant="h4" style={HelpPageStyles.sectionTitle}>4. Analyzing Results</Typography>
                <Typography variant="body1" style={HelpPageStyles.description}>
                    Once your project is analyzed, the results page will display the dependency tree along with the LibYear metrics for each dependency. You can use this information to prioritize updates and reduce technical debt.
                    <br />
                    - <strong>View Dependency Details:</strong> Click on any node in the dependency tree to view more details about that dependency, including its current version, the latest available version, and the LibYear value.
                </Typography>
            </Box>

            <Box style={HelpPageStyles.section}>
                <Typography variant="h4" style={HelpPageStyles.sectionTitle}>5. Troubleshooting</Typography>
                <Typography variant="body1" style={HelpPageStyles.description}>
                    If you encounter any issues while using the LibYear Analyzer, please refer to the following tips:
                    <br />
                    - <strong>File Upload Issues:</strong> Ensure that your project files are properly formatted and that they meet the necessary requirements for analysis.
                    <br />
                    - <strong>Slow Performance:</strong> Large projects with many dependencies may take longer to analyze. Please be patient and allow the analyzer time to process the data.
                </Typography>
            </Box>

            <Box style={HelpPageStyles.section}>
                <Typography variant="h4" style={HelpPageStyles.sectionTitle}>6. FAQs</Typography>
                <Typography variant="body1" style={HelpPageStyles.description}>
                    <strong>Q: What file formats are supported?</strong>
                    <br />
                    A: The analyzer supports common project file formats like JSON, XML, and YAML.
                    <br />
                    <br />
                    <strong>Q: How often should I analyze my project?</strong>
                    <br />
                    A: It’s recommended to analyze your project at least once a month to keep dependencies up to date.
                </Typography>
            </Box>

            <Box style={HelpPageStyles.section}>
                <Typography variant="h4" style={HelpPageStyles.sectionTitle}>7. Contact Support</Typography>
                <Typography variant="body1" style={HelpPageStyles.description}>
                    If you need further assistance, please contact our support team at support@example.com. We’re here to help!
                </Typography>
            </Box>
        </Box>
    );
};

export default HelpPage;
