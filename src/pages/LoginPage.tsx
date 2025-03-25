import { Box, Button, Divider, TextField, Typography } from "@mui/material";
import { Google as GoogleIcon, Facebook as FacebookIcon } from "@mui/icons-material";
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import React from "react";
import { User } from "../common/interface";
import { AUTH_API } from "../api/api";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const { setAuth }: any = useAuth();
  const [checkLogin, setCheckLogin] = React.useState(true);
  const [form, setForm] = React.useState<User>({ username: "", password: "" });
  const useRef = React.useRef<HTMLInputElement>(null);

  const navigate = useNavigate();
  React.useEffect(() => {
    useRef.current?.focus();
  }, [])

  const handleOnChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  const handleSubmitForm = async (e: any) => {
    e.preventDefault();
    try {
      let res: any = {};
      if (checkLogin) {
        res = await AUTH_API.apiLogin(form)
      } else {
        res = await AUTH_API.apiSignUp(form);
      }
      
      setAuth({ user: { ...res.user } });
      navigate("/dashboard", { replace: true });
      setForm({ username: "", password: "" });
    } catch (error) {
      throw new Error(error as string | undefined);
    }
  }

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
      bgcolor="#FAF3F0"
      p={2}
    >
      <Box
        sx={{
          width: 320,
          p: 3,
          bgcolor: "white",
          borderRadius: 3,
          boxShadow: 3,
          textAlign: "center",
        }}
        component={"form"}
        onSubmit={handleSubmitForm}

      >
        <Typography variant="h5" fontWeight="bold">
          Documentary Your Jouney!!!
        </Typography>

        <TextField
          fullWidth
          inputRef={useRef}
          variant="outlined"
          placeholder="Username"
          name="username"
          sx={{ mt: 3, mb: 2 }}
          onChange={handleOnChange}
        />

        <TextField
          fullWidth
          variant="outlined"
          placeholder="Password"
          type="password"
          name="password"
          sx={{ mt: 1, mb: 2 }}
          onChange={handleOnChange}
        />

        <Button
          fullWidth
          variant="contained"
          sx={{
            bgcolor: "#D3D3D3",
            color: "black",
            mb: 2,
            "&:hover": { bgcolor: "#B0B0B0" },
          }}
          type="submit"
        >
          {checkLogin ? "Login" : "Signup"}
        </Button>

        <Divider sx={{ my: 2 }}>or continue with</Divider>
        <Button
          fullWidth
          variant="outlined"
          startIcon={<VpnKeyIcon />}
          sx={{ mb: 2, color: "black", borderColor: "#D3D3D3" }}
          onClick={() => setCheckLogin(!checkLogin)}
        >
          {!checkLogin ? "Login" : "Signup"}
        </Button>

        <Button
          fullWidth
          variant="outlined"
          startIcon={<GoogleIcon />}
          sx={{ mb: 2, color: "black", borderColor: "#D3D3D3" }}
        >
          Continue with Google
        </Button>

        <Button
          fullWidth
          variant="outlined"
          startIcon={<FacebookIcon />}
          sx={{ color: "black", borderColor: "#D3D3D3" }}
        >
          Continue with Facebook
        </Button>
      </Box>
    </Box>
  );
};

export default LoginPage;
