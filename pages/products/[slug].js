import React from 'react'
import { Box, Container, Grid, Hidden, makeStyles, Paper } from "@material-ui/core"
import Header from "../../components/header"
import axios from 'axios';
import baseUrl from "../../axios/axios"
import { useRouter } from "next/router"
import Head from "next/head"

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(0),
    borderRadius: "0",
  },
  paperImagePreview:{
      paddingTop: 30,
  },
  paperImage: {
    padding: theme.spacing(0),
    borderRadius: "0",
    marginLeft: 25,
    ["@media (max-width:600px)"]: {
      marginLeft: -20,
      marginRight: -20,
    },
  },
  paperRight: {
    padding: theme.spacing(0),
    borderRadius: "0",
    paddingLeft: 40,
    paddingTop: 30,
    ["@media (max-width:600px)"]: {
      paddingLeft: 0,
      paddingTop: 10,
    },
  },
  img: {
      maxWidth: "100%",
  },
}));

function Product({product}) {
    const classes = useStyles();
    const router = useRouter()

    if (router.isFallback) {
        return <div>Loading...</div>
    }
    return (
        <>
            <Head>
                <title>{product.title} - Fasion Point</title>
            </Head>
            <Header />
            <Container maxWidth="md">
                <Grid container spacing={0}>
                    <Hidden only={["xs", "sm"]}>
                        <Grid item sm={6}>
                            <Paper className={classes.paperImagePreview} elevation={0}>
                                {product.product_image.map((item, i) => (
                                    <div key={`singleProduct${i}`}>
                                        <Paper className={classes.paperImage} elevation={0}>
                                            <img
                                                src={product.product_image[0].image}
                                                alt={product.product_image[0].alt_text}
                                                className={classes.img}
                                            />
                                        </Paper>
                                    </div>
                                ))}
                            </Paper>
                        </Grid>
                    </Hidden>

                    <Grid item xs={12} sm={6}>
                        <Paper className={classes.paperRight} elevation={0}>
                            <Box component="h1" fontSize={18} fontWeight="400">
                                {product.title}
                            </Box>
                            <Box component="p" fontSize={22} fontWeight="900" m={0}>
                                ${product.regular_price}
                            </Box>
                            <Box>
                                {product.description}
                            </Box>
                            <Box>
                                Free Delivery & Returns (Ts&Cs apply)
                            </Box>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </>
    )
}


export async function getStaticPaths(){
  return{
    paths: [{params: { slug: "woodenboots2" } }],
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
    const res = await axios.get(baseUrl.baseLocal + `/api/${params.slug}`)
    const product = res.data

    return {
        props: {
            product
        }
    }
}

export default Product
