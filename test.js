//Define the URL to test
//const yourApiKey = "PLEASE_COPY_YOUR_KEY_HERE"
const yourApiKey = "AIzaSyD58u-YnzlNq3sbJoaZzmFtTmk6wruWtxE"
const url = "https://maps.googleapis.com/maps/api/geocode/json?address=consensys,+brooklyn,+Ny&sensor=false&key="
const baseUrl = url+yourApiKey
const formattedAddressExpected = "49 Bogart St #22, Brooklyn, NY 11206, USA"
const latExpected = 40.7053762
const lngExpected = -73.9335617

describe('Testing the JSON googlemaps', () => {
  	
  //1. Test if the asnwer is a JSON
  it('returns JSON', () => {
    cy.request(baseUrl)
      .its('headers')
      .its('content-type')
      .should('include', 'application/json')
  })

  //2. Test the status of the answer
  it('Verify the status', () => {
    cy.request(baseUrl)
      .its('statusText')
      .should('eq', 'OK')
    cy.request(baseUrl)
      .its('status')
      .should('eq', 200)  
  })
     
  //3. Test the status of the body
  it('Verify body status', () => {
    cy.request(baseUrl)
      .its('status')
      .should('eq', 200)
  })

  //4. Test the formatted address
  it('Verify formatted address', () => {
    cy.request(baseUrl)
      .its('body.results.0.formatted_address')
      .should('eq', formattedAddressExpected)
  })   
  
  //5. Testing the lat and le lng of the address
  it('Verifying geo', () => {
    cy.request(baseUrl)
      .its('body.results.0.geometry.location.lat')
      .should('eq', latExpected )
    cy.request(baseUrl)
    .its('body.results.0.geometry.location.lng')
      .should('eq', lngExpected )  
  })

  //6. Test if the duration is less than a second.
  it('Verifying duration', () => {
    cy.request(baseUrl)
      .its('duration')
      .should(($duration) => {
   	  	expect($duration).to.be.lessThan(1000)
   	  	}
   	   )
      
   })
})
