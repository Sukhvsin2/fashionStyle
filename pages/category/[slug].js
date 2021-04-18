import React from 'react'
import Header from "../../components/header";
import NoItemFound from "../../components/noItem";
import CardMedia from "@material-ui/core/CardMedia";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Link from "next/link";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import axios from 'axios';
import baseUrl from "../../axios/axios"
import { useRouter } from "next/router"
import { makeStyles } from "@material-ui/core/styles";
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
  
  cardGrid: {
    // paddingBottom: theme.spacing(8),
    margin: theme.spacing(4)
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    borderRadius: "0",
    cursor: 'pointer'
  },
  cardMedia: {
    height: '35vh',
    objectFit: 'contain'
  },
}));

function Category({products, slug}) {
    const classes = useStyles();
    const router = useRouter()

    if (router.isFallback) {
        return <div>Loading...</div>
    }
    return (
        <>
            <Head>
                <title>{slug.replace(/^\w/, c => c.toUpperCase())} Category - Fasion Point</title>
            </Head>
            <Header />
            <Container className={classes.cardGrid} maxWidth="lg">
          <Grid container spacing={2}>
            {products.length > 0 ? products.map((product) => (
              <Link key={product.id} href={`/products/${encodeURIComponent(product.slug)}`}>
                <Grid item xs={12} sm={6} md={4} lg={3} >
                  <Card className={classes.card} elevation={1}>
                  <CardMedia
                        className={classes.cardMedia}
                        image={product.product_image[0].image}
                        title={ product.product_image[0].alt_text }
                        alt={product.product_image[0].alt_text}
                      />
                    <CardContent>
                      <Typography gutterBottom component="p">
                        {product.title}
                      </Typography>
                      <Box component="p" fontSize={16} fontWeight={900}>
                        £{product.regular_price}
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              </Link>
            )) : <NoItemFound/>}
          </Grid>
        </Container>
        </>
    )
}


export async function getStaticPaths(){
  return{
    paths: [{params: { slug: "shoes" } }],
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
    const res = await axios.get(baseUrl.baseLocal + `/api/category/${params.slug}`)
    const products = res.data
    // console.log(product);

    return {
        props: {
            products,
            slug: params.slug
        }
    }
}

export default Category
