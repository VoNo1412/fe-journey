import { Box, Button, Divider, TextField, Typography } from "@mui/material";
import { Google as GoogleIcon, Facebook as FacebookIcon } from "@mui/icons-material";
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import React from "react";
import { User } from "../common/interface";
import { AUTH_API } from "../api/api";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import alertProgressFeature from "../common/alert";

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
      sx={{ background: "radial-gradient(#a43f3f, transparent);" }}
      p={2}
    >
      <Box
        sx={{
          width: 320,
          p: 3,
          // bgcolor: "var(--primary-deep-bgColor)",
          background: "radial-gradient(#a43f3f, transparent);",
          borderRadius: 3,
          boxShadow: 3,
          textAlign: "center",
        }}
        component={"form"}
        onSubmit={handleSubmitForm}

      >
        <Typography variant="h5" fontWeight="bold">
          Documentary Your Journey!!!
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
          sx={{ mb: 2, color: "var(--primary-color)", borderColor: "#D3D3D3" }}
          onClick={() => setCheckLogin(!checkLogin)}
        >
          {!checkLogin ? "Login" : "Signup"}
        </Button>

        <Button
          fullWidth
          variant="outlined"
          startIcon={<GoogleIcon />}
          sx={{ mb: 2, color: "var(--primary-color)", borderColor: "#D3D3D3" }}
          onClick={alertProgressFeature}
        >
          Continue with Google
        </Button>

        <Button
          fullWidth
          variant="outlined"
          startIcon={<FacebookIcon />}
          onClick={alertProgressFeature}
          sx={{ color: "var(--primary-color)", borderColor: "#D3D3D3" }}
        >
          Continue with Facebook
        </Button>
      </Box>
    </Box>
  );
};

export default LoginPage;
