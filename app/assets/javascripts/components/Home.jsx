class Home extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      people: null
    }

    this.upload = this.upload.bind(this)
    this.getPeopleList = this.getPeopleList.bind(this)
  }

  upload(event) {
    event.preventDefault()
    var fileSelect = document.getElementById("myfile");
    var files = fileSelect.files;
    var formData = new FormData();
    for (var i = 0; i < files.length; i++) {
      var file = files[i];
      formData.append('csv', file, file.name);
    }
    fetch("/upload.json", {
      method: "post",
      body: formData
    }).then((response) => {
      if (response.status === 200) {
        this.getPeopleList()
      }
    })
  }

  getPeopleList() {
    this.setState({people: null})
    fetch("/people.json", {
      method: "get",
    }).then((response) => {
      response.json().then((data) => {
        this.setState({people: data})
      })
    })
  }

  renderTable() {
    if (this.state.people !== null) {
      return <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Birthday</th>
            <th>Number</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
        {
          this.state.people.map((person) => {
            return <tr key={ person.id }>
              <td>{ person.name }</td>
              <td>{ person.birthday }</td>
              <td>{ person.number }</td>
              <td>{ person.description }</td>
            </tr>
          })
        }
        </tbody>
      </table>
    }
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
              <input id="myfile" name="myfile" type="file" />
            </div>
            <input type="submit" className="btn btn-primary" value="submit" />
          </form>
          { this.renderTable() }
        </div>
        <div className="col-0 col-md-3"></div>
      </div>
    </div>
  }
}
