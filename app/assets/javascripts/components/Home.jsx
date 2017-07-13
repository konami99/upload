class Home extends React.Component {
  constructor(props) {
    super(props)

    this.submit = this.submit.bind(this)
  }

  submit(event) {
    event.preventDefault()
  }

  render() {
    return <div className="container">
      <div className="row">
        <div className="col-0 col-md-3"></div>
        <div className="col-12 col-md-6">
          <div className="page-header">
            <h1>Upload file</h1>
          </div>
          <form className="form-group" id="task-form" encType="multipart/form-data" method="post" onSubmit={ this.submit }>
            <div className="form-group">
              <input name="myfile" type="file" />
            </div>
            <input type="submit" className="btn btn-primary" value="submit" />
          </form>
        </div>
        <div className="col-0 col-md-3"></div>
      </div>
    </div>
  }
}
