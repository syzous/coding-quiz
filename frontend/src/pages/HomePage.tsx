import { Box, Button, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { v4 as uuidv4 } from "uuid";

export const HomePage = () => {
  const [name, setName] = useState("");
  const [roomId, setRoomId] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const storedName = sessionStorage.getItem("userName");
    if (storedName) {
      setName(storedName);
    }
  }, []);

  return (
    <Box
      sx={{
        paddingTop: 2,
        display: "flex",
        gap: 2,
        paddingInline: 2,
        alignItems: "center",
      }}
    >
      <TextField
        value={name}
        onChange={(e) => {
          setName(e.target.value);
          sessionStorage.setItem("userName", e.target.value);
        }}
        variant="outlined"
        label="Name"
      ></TextField>
      <TextField
        fullWidth
        value={roomId}
        onChange={(e) => setRoomId(e.target.value)}
        variant="outlined"
        label="RoomId"
      ></TextField>
      <Button
        disabled={!roomId || !name}
        onClick={() => {
          if (name && roomId) {
            navigate(`/room/${roomId}`);
          }
        }}
        variant="contained"
      >
        Join Room
      </Button>
      <Button
        disabled={!name}
        variant="contained"
        onClick={() => {
          if (name) {
            navigate(`/room/${uuidv4()}`);
          }
        }}
      >
        Create Room
      </Button>
    </Box>
  );
};
