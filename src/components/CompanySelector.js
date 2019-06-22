// @flow
import React, { Component } from 'react'
import { TextField, List, ListItem, ListItemText, ListItemSecondaryAction, ListItemIcon, Typography, Grid, Divider } from '@material-ui/core'
import { Person } from '@material-ui/icons'
import styled from 'styled-components'
import _ from 'lodash'
import { companies } from './../dummyData/companySearch'

const TableAction = styled('div')`
    && {
        background-color: red;
        height: 40px;
        color: red;
    }
`

const TableRow = ({ children, company, isChildCompany }) => {
    const { primaryName, cmCount, website, dncCodeName, countryName, state, city } = company
    const DNCDescription = 'Do Not Contact'
    const cleanCountry = countryName ? countryName.trim() : null
    const cleanState = state ? state.trim() : null
    const cleanCity = city ? city.trim() : null
    const rowHeight = cleanCountry || cleanState || cleanCity ? '60px' : '40px'
    return (
        <Grid style={{ height: rowHeight }} container direction="row" justify="space-between" alignItems="flex-end">
            <CompanyInfo
                country={cleanCountry}
                state={cleanState}
                city={cleanCity}
                primaryName={primaryName}
                website={website}
                leftPadding={isChildCompany ? '24px' : '0px'}
            />
            <CMInfo isDNC={dncCodeName === DNCDescription} cmCount={cmCount} />
        </Grid>
    )
}

const CompanyInfo = ({ children, leftPadding = '0px', primaryName, country, state, city }) => (
    <Grid container item xs={9} style={{ height: '100%', paddingLeft: `${leftPadding}` }} direction="column" justify="space-evenly" alignItems="flex-start">
        <Typography>{primaryName}</Typography>
        <Typography variant="caption">
            {city ? `${city}, ` : ''}
            {state ? `${state}, ` : ''}
            {country ? `${country}` : ' '}
        </Typography>

        {/* <Typography variant="caption">{website || 'n/a'}</Typography> */}
    </Grid>
)

const CMInfo = ({ children, cmCount, dncCode }) => (
    <Grid container item xs={3} style={{ paddingRight: '8px', height: '100%' }} justify="flex-end" alignItems="center">
        {dncCode && (
            <Typography style={{ color: '#D32f2F' }} variant="caption" display="inline">
                DNC
            </Typography>
        )}
        <Person />
        <Typography variant="caption" display="inline">
            {cmCount}
        </Typography>
    </Grid>
)

export class CompanySelector extends Component {
    constructor(props) {
        super(props)
        this.state = { results: undefined, query: 'Google' }
        this.search = _.debounce(this.search.bind(this), 300)
        this.createCompany = this.createCompany.bind(this)
    }

    componentDidMount() {
        this.search('Google')
    }

    search = async query => {
        const response = this.organizeCompanies(companies)
        this.setState({ results: response })
    }

    createCompany = async () => {
        const companyName = this.state.query
        this.setState({ results: [] })
        try {
            //TODO: Should we fetch the company now to return it with all the info?
            const response = { COMPANY_ID: 19037117 } //   await createCompany(companyName)
        } catch (e) {
            console.log(e.message)
        }
    }

    transformedToParentWithSubCompany(company) {
        return {
            companyId: company.parent__companyId,
            primaryName: company.parent__primaryName,
            secondaryName: company.parent__secondaryName,
            city: company.parent,
            state: company.parent__state,
            country: company.parent__country,
            countryName: company.parent__country,
            cmCount: company.parent__cmCount,
            ticker: company.parent__ticker,
            isConfirmed: company.parent__isConfirmed,
            dncCode: company.parent__dncCode,
            dncCodeName: company.parent__dncCodeName,
            RANK: company.RANK,
            childCompanies: [company]
        }
    }
    organizeCompanies(companies) {
        const organized = companies.reduce((final, company, index, companies) => {
            const isParentCompany = company.parent__companyId === null
            if (isParentCompany) {
                final[company.companyId] = company
            } else {
                //Check if it already exists
                let existingCompany = final[company.parent__companyId]
                if (existingCompany) {
                    // Add to childCompanies
                    existingCompany.childCompanies.push(company)
                } else {
                    // Transform company with this company info in childCompanies array
                    final[company.parent__companyId] = this.transformedToParentWithSubCompany(company)
                }
            }
            return final
        }, {})
        // Turn into an array
        let results = []
        for (let companyId in organized) {
            results.push(organized[companyId])
        }
        return results
    }
    render() {
        const { results, query } = this.state

        return (
            <div style={{ padding: '24px' }}>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <TextField
                        onChange={e => {
                            const query = e.target.value
                            this.search(query)
                            this.setState({ query, results: undefined })
                        }}
                        placeholder="Search for company"
                        value={query}
                        label="Company name"
                        fullWidth={true}
                    />

                    <List style={{ overflowY: 'scroll', flex: 1 }}>
                        {results ? (
                            results.map((company, index) => {
                                const { companyId, childCompanies } = company
                                let subCompanies = ['']
                                if (childCompanies) {
                                    subCompanies = []
                                    childCompanies.forEach(subComp => {
                                        const { companyId } = subComp
                                        subCompanies.push(
                                            <div key={`sub-${companyId}-${index}`}>
                                                <TableRow company={subComp} isChildCompany={true} />
                                                <Divider style={{ marginLeft: '24px' }} />
                                            </div>
                                        )
                                    })
                                }
                                return (
                                    <div key={companyId}>
                                        <TableRow company={company} />
                                        <Divider />
                                        {subCompanies}
                                    </div>
                                )
                            })
                        ) : (
                            <div>Loading</div>
                        )}
                    </List>
                </div>
                <TableAction onClick={this.createCompany}>CREATE</TableAction>
            </div>
        )
    }
}

export default CompanySelector
