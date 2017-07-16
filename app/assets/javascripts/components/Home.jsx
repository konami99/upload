class Home extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      people: null,
      mofifiedPeople: null,
      sortOrder: "ascending"
    }

    this.upload = this.upload.bind(this)
    this.getPeopleList = this.getPeopleList.bind(this)
    this.sort = this.sort.bind(this)
    this.filter = this.filter.bind(this)
  }

  componentDidMount() {
    this.getPeopleList()
  }

  filter(event) {
    var filter = event.currentTarget.value.toLowerCase()
    var filteredPeople = this.state.people.filter((person) => {
      return person["name"].toLowerCase().includes(filter)
    })
    this.setState({mofifiedPeople: filteredPeople})
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
        this.setState({
          people: data,
          mofifiedPeople: data
        })
      })
    })
  }

  sort(event) {
    var sortBy = event.currentTarget.getAttribute("data-column")
    var sortedPeople = this.state.people.sort((a, b) => {
      var nameA = a[sortBy]
      var nameB = b[sortBy]
      if (this.state.sortOrder === "ascending") {
        event.currentTarget.innerHTML = event.currentTarget.innerHTML + " ^"
        if (nameA < nameB) {
          return 1
        }
        if (nameA > nameB) {
          return -1
        }
        return 0
      } else {
        event.currentTarget.innerHTML = event.currentTarget.innerHTML + " v"
        if (nameA < nameB) {
          return -1
        }
        if (nameA > nameB) {
          return 1
        }
        return 0
      }
    })

    this.setState({mofifiedPeople: sortedPeople})
    if (this.state.sortOrder === "ascending") {
      this.setState({sortOrder: "descending"})
    } else {
      this.setState({sortOrder: "ascending"})
    }
  }

  renderTable() {
    if (this.state.mofifiedPeople && this.state.mofifiedPeople.length) {
      return <table className="table table-striped">
        <thead>
          <tr>
            <th className="header" data-column="name" onClick={ this.sort }>Name</th>
            <th className="header" data-column="birthday" onClick={ this.sort }>Birthday</th>
            <th className="header" data-column="number" onClick={ this.sort }>Number</th>
            <th className="header" data-column="description" onClick={ this.sort }>Description</th>
          </tr>
        </thead>
        <tbody>
        {
          this.state.mofifiedPeople.map((person) => {
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
          <form className="form-group" id="task-form" encType="multipart/form-data" method="post" action="/upload" onSubmit={ this.upload }>
            <div className="form-group">
              <input id="myfile" name="myfile" type="file" />
            </div>
            <input type="submit" className="btn btn-primary" value="Upload" />
          </form>
          <input type="text" className="filter" placeholder="filter" onChange={ this.filter } />
          { this.renderTable() }
        </div>
        <div className="col-0 col-md-3"></div>
      </div>
    </div>
  }
}
