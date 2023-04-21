import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Tema } from '../../../models/Tema'
import { getAll } from "../../../services/service";
import useLocalStorage from "react-use-localstorage";
import { useNavigate } from "react-router-dom";

function ListaTemas() {
  const [temas, setTemas] = useState<Tema[]>([]);
  const [token, setToken] = useLocalStorage("token");
  const history = useNavigate();

  async function getAllTemas() {
    await getAll("/temas", setTemas, {
      headers: {
        Authorization: token,
      },
    });
  }

  useEffect(() => {
    getAllTemas();
  }, []);

  useEffect(() => {
    if (token === "") {
      alert("Sem token não né meu bom");
      history("/login");
    }
  }, []);

  return (
    <>
      {temas.map((tema) => (
        <Box m={4}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Tema:
              </Typography>
              <Typography variant="h5" component="h2">
                {tema.descricao}
              </Typography>
            </CardContent>
            <CardActions>
              <Button color="primary" variant="contained" size="small">
                Editar
              </Button>
              <Button color="secondary" variant="contained" size="small">
                Deletar
              </Button>
            </CardActions>
          </Card>
        </Box>
      ))}
    </>
  );
}

export default ListaTemas;