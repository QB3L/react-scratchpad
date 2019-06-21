// @flow
import React, { Component } from 'react'
import { TextField, List, ListItem, ListItemText, ListItemSecondaryAction, ListItemIcon, Typography } from '@material-ui/core'
import {Person} from '@material-ui/icons';
import styled from 'styled-components'
import _ from 'lodash'
import { companies } from './../dummyData/companySearch'

type TProps = {
    query?: string,
    onSelect: (data: any) => void
}

type TState = {
    results?: any,
    query?: string
}

type Company = {
    companyId: string,
    primaryName: string,
    secondaryName: string,
    city: string,
    state: string,
    country: string,
    countryName: string,
    cmCount: string,
    ticker: string,
    isConfirmed: string,
    ciqId: string,
    dncCode: string,
    dncCodeName: string,
    stockExchangeAbbr: string,
    parent__companyId: string,
    parent__primaryName: string,
    parent__secondaryName: string,
    parent__city: string,
    parent__state: string,
    parent__country: string,
    parent__ticker: string,
    parent__isConfirmed: string,
    parent__stockExchangeAbbr: string,
    parent__cmCount: string,
    parent__dncCode: string,
    parent__dncCodeName: string,
    RANK: string
}

const CompanyListItem = styled(ListItem)`
    && {
        padding-left: 0;
        height: 60px;
    }
`

const ChildCompanyListItem = styled(ListItem)`
    && {
        padding-left: 36px;
        height: 60px;
    }
`

const ExtraCompanyInfo = styled(ListItemText)`
    && {

    }
`
const TableAction = styled('div')`
    && {
        background-color:red;
        height: 40px;
        color: red;
    }
` 
export class CompanySelector extends Component<TProps, TState> {
    constructor(props: TProps) {
        super(props)
        this.state = { results: undefined, query: 'Google' }
        this.search = _.debounce(this.search.bind(this), 300)
        this.createCompany = this.createCompany.bind(this)
    }

    componentDidMount() {
        this.search('Google')
    }

    search = async (query: string) => {
        const response = this.organizeCompanies(companies);
        this.setState({ results: response })
    }

    createCompany = async() => {
        const companyName = this.state.query;
        this.setState({results:[]})
        try {
            //TODO: Should we fetch the company now to return it with all the info?
            const response = {COMPANY_ID:19037117} //   await createCompany(companyName)
        } catch(e) {
            console.log(e.message);
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
            childCompanies:[company]
        }
    }
    organizeCompanies(companies) {
        const organized = companies.reduce((final, company, index, companies) => {
            const isParentCompany = company.parent__companyId === null;
            if (isParentCompany) {
                final[company.companyId] = company;
            } else { //Check if it already exists
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
        let results = [];
        for (let companyId in organized) {
            results.push(organized[companyId])
        }
        return results
    }
    itemsFromResults(results) {

    }
    render() {
        const { results, query } = this.state
        return (
            <div style={{padding:'24px'}}>
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
                            results.map((company: Company) => {
                                const { companyId, primaryName, cmCount, parent__primaryName:parentName, childCompanies, website } = company
                                let subCompanies = ['']
                                if (childCompanies) {
                                    subCompanies = []
                                    childCompanies.forEach((subComp) => {
                                        const {primaryName, cmCount, website} = subComp
                                        subCompanies.push(
                                            <ChildCompanyListItem>
                                                <ListItemText primary={primaryName} secondary={`${website || 'n/a'}`}></ListItemText>
                                                <ListItemSecondaryAction>
                                                    <Person />
                                                    <Typography variant='subtitle1' display='inline'>{cmCount}</Typography>
                                                </ListItemSecondaryAction>
                                            </ChildCompanyListItem>
                                        )
                                    })
                                }
                                return (
                                    <>
                                    <CompanyListItem divider={true} key={companyId} onClick={() => console.log(company)}>
                                    <ListItemText primary={primaryName} secondary={`${website || 'n/a'}`}></ListItemText>
                                    <ListItemSecondaryAction>
                                        <Person />
                                        <Typography variant='subtitle1' display='inline'>{cmCount}</Typography>
                                    </ListItemSecondaryAction>
                                    </CompanyListItem>
                                    {subCompanies}
                                    </>
                                )
                            })
                        ) : (
                            <div>Loading</div>
                        )}
                    </List>
                </div>
                <TableAction 
                    onClick={this.createCompany}
                >CREATE</TableAction>
            </div>
        )
    }
}

export default CompanySelector