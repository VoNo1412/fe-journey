import { Box, Button, Divider, InputAdornment, TextField, Typography } from "@mui/material";
import { Google as GoogleIcon } from "@mui/icons-material";
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import React from "react";
import { User } from "../Todo/interface/interface";
import { AUTH_API } from "../../api/api";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import "react-toastify/dist/ReactToastify.css";
import { clearNotification, showNotification } from "../../store/notificationSlice";
import PersonIcon from '@mui/icons-material/Person';
import LockOpenIcon from '@mui/icons-material/LockOpen';

const LoginPage = () => {
  const { setAuth }: any = useAuth();
  const [checkLogin, setCheckLogin] = React.useState(true);
  const [form, setForm] = React.useState<User>({ username: "", password: "" });
  const useRef = React.useRef<HTMLInputElement>(null);
  const dispatch = useDispatch<AppDispatch>();
  const { message, type } = useSelector((state: RootState) => state.notification);

  const navigate = useNavigate();
  React.useEffect(() => {
    useRef.current?.focus();
  }, [])

  React.useEffect(() => {
    if (message) {
      toast[type as "success" | "error" | "info" | "warning"](message);
    }
  }, [message, type]);

  const handleOnChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  const handleSubmitForm = async (e: any) => {
    e.preventDefault();
    dispatch(clearNotification());
    try {
      let res: any = {};
      if (checkLogin) {
        res = await AUTH_API.apiLogin(form)
      } else {
        res = await AUTH_API.apiSignUp(form);
      }

      setAuth({ user: { ...res.user } });
      navigate("/todo", { replace: true });
      setForm({ username: "", password: "" });
    } catch (error: any) {
      console.log("this is error: ", error);
      dispatch(showNotification({ message: error?.response?.data?.message, type: "error" }));
      throw error
    }
  }

  const handleLoginGoogle = () => AUTH_API.apiLoginWithGoogle();


  return (
    <>
      <ToastContainer position="top-right" autoClose={1000} />
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
            width: 400,
            p: 3,
            background: "radial-gradient(#a43f3f, transparent);",
            borderRadius: 3,
            boxShadow: 3,
            textAlign: "center",

          }}
          component={"form"}
          onSubmit={handleSubmitForm}

        >
          <Typography variant="h5" fontWeight="bold">
            Documentary About Your Journey!!!
          </Typography>

          <TextField
            fullWidth
            inputRef={useRef}
            variant="outlined"
            placeholder="Username"
            required
            name="username"
            sx={{
              mt: 3, mb: 2
            }}
            onChange={handleOnChange}
            slotProps={{
              input: {
                style: {
                  backgroundColor: 'transparent',
                  color: 'white',
                },
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonIcon sx={{ color: "var(--primary-color)" }} />
                  </InputAdornment>
                ),
              },
            }}
          />


          <TextField
            fullWidth
            variant="outlined"
            required
            placeholder="Password"
            type="password"
            name="password"
            sx={{
              mt: 1, mb: 2,
            }}
            onChange={handleOnChange}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <LockOpenIcon sx={{ color: "var(--primary-color)" }} />
                  </InputAdornment>
                ),
              },
            }}
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
            onClick={handleLoginGoogle}
          >
            Continue with Google
          </Button>
          {/* 
          <Button
            fullWidth
            variant="outlined"
            startIcon={<FacebookIcon />}
            onClick={alertProgressFeature}
            sx={{ color: "var(--primary-color)", borderColor: "#D3D3D3" }}
          >
            Continue with Facebook
          </Button>  */}
        </Box>
      </Box>
    </>
  );
};

export default LoginPage;
