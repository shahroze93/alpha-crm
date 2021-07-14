function CommInfo(props) {
  return (
    <div key={props.info.id}>
        <h4>Person Contacted: {props.info.fields.name_contacted}</h4>
        <p>Company Name: {props.info.fields.name_company_customers}</p>
        <p>Method of Contact: {props.info.fields.contact_method}</p>
        <p>Topic of Discussion: {props.info.fields.topic_discussed}</p>
        <p>Expected Revenue: {props.info.fields.expected_revenue}</p>
        <p>Notes: {props.info.fields.notes}</p>
  </div>
  )
}

export default CommInfo;