
import { Box, Card, } from "@mui/material"
import CardMedia from '@mui/material/CardMedia';
const Leftarea = () => {
  return (
    <Box bgcolor='skyblue' flex={6}>
      <Box position={"fixed"}>
        <Card>
          <CardMedia
            component="img"
            height="50"
            image="/src/app/components/map.jpg"
            alt="Map"
          />
        </Card>
      </Box>
    </Box>
  );
}

export default Leftarea;