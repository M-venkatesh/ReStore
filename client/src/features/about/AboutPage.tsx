import { Alert, AlertTitle, Button, ButtonGroup, Container, List, ListItem, ListItemText, Typography } from "@mui/material";
import agent from "../../app/api/agent";
import { useState } from "react";

export default function AboutPage(){
    const [validationErrors, setvalidationErrors] =useState<string[]>([]);

    function getValidationError(){
        agent.TestErrors.getValidationError()
        .then(() => console.log("Should not see this"))
        .catch(error=>setvalidationErrors(error));
    }
    return(
        <Container>
            <Typography gutterBottom variant="h2">
                Test Errors
            </Typography>
            <ButtonGroup fullWidth>
                <Button onClick={() => agent.TestErrors.get400Error().catch(error => console.log(error))}>400 Error</Button>
                <Button onClick={() => agent.TestErrors.get401Error().catch(error => console.log(error))}>401 Error</Button>
                <Button onClick={() => agent.TestErrors.get404Error().catch(error => console.log(error))}>404 Error</Button>
                <Button onClick={() => agent.TestErrors.get500Error().catch(error => console.log(error))}>500 Error</Button>
                <Button onClick={getValidationError}>Validation Error</Button>
            </ButtonGroup>
            {validationErrors.length>0 &&
                <Alert severity="error">
                    <AlertTitle>Validation Errors</AlertTitle>
                    {validationErrors}
                    <List>
                        {validationErrors.map(error=>(
                            <ListItem key={error}>
                                <ListItemText>{error}</ListItemText>

                            </ListItem>
                        ))}
                    </List>
                </Alert>
            }
        </Container>
    )
}