import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Box,
  Button,
  Checkbox,
  createTheme,
  FormControl,
  FormControlLabel,
  FormGroup,
  IconButton,
  InputAdornment,
  InputLabel,
  Link,
  OutlinedInput,
  ThemeProvider,
  Typography,
} from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { fetcher } from "../lib/api";
import { setToken } from "../lib/auth";
import { useUser } from "../lib/authContext";

const Login = () => {
  const [values, setValues] = useState({
    identifier: "",
    password: "",
    showPassword: false,
  });

  const { user, loading } = useUser();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const responseData = await fetcher(
      `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/auth/local`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          identifier: values.identifier,
          password: values.password,
        }),
      }
    );
    console.log(1, "try");
    setToken(responseData);
    location.href = "/";
    // router.push("/");
  };

  const theme = createTheme({
    components: {
      MuiTypography: {
        variants: [
          {
            props: {
              variant: "h6",
            },
            style: {
              fontSize: 14,
              fontWeight: 400,
              color: "#6F7082",
            },
          },
          {
            props: {
              variant: "h6B",
            },
            style: {
              fontSize: 14,
              fontWeight: 500,
              color: "#0F112E",
            },
          },
        ],
      },
      palette: {
        primary: {
          main: "#2557E3",
          darker: "#053e85",
        },
        neutral: {
          main: "#4339F2",
          contrastText: "#fff",
        },
      },
    },
  });
  useEffect(() => {
    // {
    //   !loading && (user ? <Link href="/index" /> : "");
    // }

    {
      !loading && (user ? router.push("/") : "");
    }
  }, []);

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
    // {
    //   !loading && (user ? <Link href="/index" /> : "");
    // }
    {
      !loading && (user ? router.push("/") : "");
    }
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  return (
    <Box display="flex">
      <Image src="/static/login.png" width={864} height={900}></Image>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        paddingLeft="72px"
      >
        <Typography fontWeight="700" fontSize="48px">
          Welcome back!
        </Typography>
        <Typography fontWeight="400" fontSize="16px">
          Please signin into your Frankcon account.
        </Typography>
        {!loading && (user ? <Link href="/index" /> : "")}
        {!loading && !user ? (
          <>
            <FormControl sx={{ m: 1, width: "100%" }} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">
                Email
              </InputLabel>
              <OutlinedInput
                value={values.identifier}
                onChange={handleChange("identifier")}
                name="identifier"
                width="100%"
                label="Email"
              />
            </FormControl>
            <FormControl sx={{ m: 1, width: "100%" }} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">
                Password
              </InputLabel>
              <OutlinedInput
                name="password"
                id="outlined-adornment-password"
                type={values.showPassword ? "text" : "password"}
                value={values.password}
                width="100%"
                onChange={handleChange("password")}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {values.showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
            </FormControl>
            <Box
              width="100%"
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <FormGroup>
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label="Remember me"
                />
              </FormGroup>
              <Typography>Forgot Password?</Typography>
            </Box>
            <ThemeProvider theme={theme}>
              <Box
                display="flex"
                justifyContent="flex-end"
                alignItems="flex-start"
                bgcolor="#4339F2"
                width="fit-content"
                marginTop="36px"
              >
                {/* <Button color="main">Mark as Read</Button> */}
                <Button onClick={handleSubmit}>
                  <Typography
                    paddingY="13.5px"
                    paddingX="44.5px"
                    variant="p"
                    fontSize="14px"
                    color="white"
                  >
                    Login
                  </Typography>
                </Button>
              </Box>
              <Box display="flex" justifyContent="center" alignItems="center">
                <Typography>If you don&apos;t have an account, </Typography>
                <Button
                  // onClick={handleOpen}
                  color="primary"
                >
                  Register here!
                </Button>
              </Box>
            </ThemeProvider>
          </>
        ) : (
          ""
        )}
      </Box>
    </Box>
  );
};

export default Login;
