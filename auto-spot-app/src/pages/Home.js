import React from "react"
import { Container, Grid} from "@mui/material"
import CustomCard from "../components/CustomCard"

export default function Home() {
  return (
    <Container>
      <Grid container>
        <Grid item>
          <CustomCard/>
        </Grid>
        <Grid item>
          <CustomCard/>
        </Grid>
        <Grid item>
          <CustomCard/>
        </Grid>
      </Grid>
    </Container>
  )
}