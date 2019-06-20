import React from 'react'

import Button from '@material-ui/core/Button';
import { Grid, Typography } from '@material-ui/core';
import { Person } from '@material-ui/icons'
import Container from '@material-ui/core/Container';
class FlexStuff extends React.Component {
    state = {
        direction: 'row',
        justify: 'space-between',
        alignItems: 'flex-end',
        amount: 5
    }
    render() {
    const { params } = this.props.match // This is how you get parameters in the url so /flex/:number
    const { direction, justify, alignItems, amount } = this.state
    let persons = []
    for(var i = 0; i < amount; i++) {
        persons.push(<Person/>)
    }
    return(

        <Container maxWidth="sm">
            <Container style={{"height":"200px"}}>
                <Grid
                    container
                    direction={direction}
                    justify={justify}
                    alignItems={alignItems}
                >
                    {persons}
                    
                </Grid>
            </Container>
            <h2>Direction</h2>
            <Grid
                container
                direction="row"
                justify="space-between"
                alignItems="flex-end"
            >
                <Button onClick={()=>{this.setState({direction:'row'})}} >Direction Row</Button>
                <Button onClick={()=>{this.setState({direction:'column'})}} >Direction Column</Button>
                
                
            </Grid>
            <h2>Justify</h2>
            <Grid
                container
                direction="row"
                justify="space-between"
                alignItems="flex-end"
            >
                <Button onClick={()=>{this.setState({justify:'flex-start'})}} >Justify Start</Button>
                <Button onClick={()=>{this.setState({justify:'center'})}} >Justify Center</Button>
                <Button onClick={()=>{this.setState({justify:'flex-end'})}} >Justify End</Button>
                <Button onClick={()=>{this.setState({justify:'space-between'})}} >Justify Space Between</Button>
                <Button onClick={()=>{this.setState({justify:'space-around'})}} >Justify Space Around</Button>
                <Button onClick={()=>{this.setState({justify:'space-evenly'})}} >Justify Space Evenly</Button>
            </Grid>
            <h2>Align</h2>
            <Grid
                container
                direction="row"
                justify="space-between"
                alignItems="flex-end"
            >
                <Button onClick={()=>{this.setState({alignItems:'flex-start'})}} >Align Start</Button>
                <Button onClick={()=>{this.setState({alignItems:'center'})}} >Align Center</Button>
                <Button onClick={()=>{this.setState({alignItems:'flex-end'})}} >Align End</Button>
                <Button onClick={()=>{this.setState({alignItems:'stretch'})}} >Align Stretch</Button>
                <Button onClick={()=>{this.setState({alignItems:'baseline'})}} >Align Baseline</Button>
            </Grid>
            <h2>Number of Icons</h2>
            <Grid
                container
                direction="row"
                justify="space-between"
                alignItems="flex-end"
            >
                <Button onClick={()=>{this.setState({amount: amount+1})}}>Add One</Button>
                <Button onClick={()=>{this.setState({amount: amount-1})}}>Remove One</Button>
            </Grid>

            
            <Container>
                <h2>Selected Values</h2>
                <Typography>Direction: {direction}</Typography>
                <Typography>Justify: {justify}</Typography>
                <Typography>Alignment: {alignItems}</Typography>
            </Container>
            
            
        </Container>
    )
  }
}
export default FlexStuff