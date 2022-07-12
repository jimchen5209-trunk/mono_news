import { useState, useEffect } from "react";
import { Box, Stack, Container } from "@mui/material";
import Card from '../Components/Card';

function App() {
  const [items, setItems] = useState([]);
  
  useEffect(() => {
    fetch("https://hihl.herokuapp.com/message", { method: "GET" })
      .then((res) => res.json())
      .then((data) => {
        const sortedData = data.data;
        sortedData.sort((a, b) => {
          let da = new Date(a.date),
            db = new Date(b.date);
          return db - da;
        });
        setItems(sortedData);
      })
      .catch((e) => {
        console.log(e);
      });
  });

  return (
    <Box m={2} pt={3}>
      <Container maxWidth="xl">
        <Box display="flex" justifyContent="center" alignItems="center">
          <Stack spacing={2} direction="column">
            {items.map((x) => (
              <Card key={x.title} title={x.title} date={x.date} />
            ))}
          </Stack>
        </Box>
      </Container>
    </Box>
  );
}

export default App;
