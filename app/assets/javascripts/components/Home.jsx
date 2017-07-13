class Home extends React.Component {
  constructor(props) {
    super(props)

    this.upload = this.upload.bind(this)
    this.uploaded = this.uploaded.bind(this)
  }

  upload(event) {
    event.preventDefault()
    POST(event, this.uploaded, this, "upload")
  }

  uploaded() {
  }

  render() {
    return <div className="container">
      <div className="row">
        <div className="col-0 col-md-3"></div>
        <div className="col-12 col-md-6">
          <div className="page-header">
            <h1>Upload file</h1>
          </div>
          <form className="form-group" id="task-form" encType="multipart/form-data" method="post" action="/upload" onSubmit={ this.upload }>
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
