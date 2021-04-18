import { makeStyles } from "@material-ui/core/styles";
import Header from "../components/header";
import Box from "@material-ui/core/Box";
import CardMedia from "@material-ui/core/CardMedia";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Link from "next/link";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import axios from "axios";
import baseUrl from "../axios/axios"

const useStyles = makeStyles((theme) => ({
  example: {
    color: "#ccc",
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
  },
  cardMedia: {
    height: '35vh',
    objectFit: 'contain'
  },
}));

function Home({ posts,  }) {
  const classes = useStyles();

  return (
    <>
      <Header/>
      <main>
        <Container className={classes.cardGrid} maxWidth="lg">
          <Grid container spacing={2}>
            {posts.map((post) => (
              <Link key={post.id} href={`product/${encodeURIComponent(post.slug)}`}>
                <Grid item xs={12} sm={6} md={4} lg={3} >
                  <Card className={classes.card} elevation={1}>
                  <CardMedia
                        className={classes.cardMedia}
                        image={post.product_image[0].image}
                        title="Image title"
                        alt={post.product_image[0].alt_text}
                      />
                    <CardContent>
                      <Typography gutterBottom component="p">
                        {post.title}
                      </Typography>
                      <Box component="p" fontSize={16} fontWeight={900}>
                        £{post.regular_price}
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              </Link>
            ))}
          </Grid>
        </Container>
      </main>
    </>
  );
}

export async function getStaticProps() {
  const res = await axios.get(baseUrl.baseLocal + '/api');
  const posts = res.data
  
  return {
    props: {
      posts,
    },
  };
}

export default Home;