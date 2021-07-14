function CustomerInfo(props) {
  // console.log(props)
  return (
    <div key={props.info.id}>
        <h4>{props.info.fields.name_contact}</h4>
        <p>{props.info.fields.designation}</p>
        <p>{props.info.fields.phone}</p>
        <p>{props.info.fields.email}</p>
        <p>{props.info.fields.name_company_customers}</p>
    </div>
  )
}

export default CustomerInfo;