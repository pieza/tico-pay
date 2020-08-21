# user data
data "template_file" "init" {
  template = file("${path.module}/scripts/init.sh")
  vars = {
    app_port     = var.app_port
    domain       = var.domain
    email        = var.email
  }
}

# ssh key
resource "digitalocean_ssh_key" "default" {
  name       = "e-Descargas ssh key"
  public_key = file("${path.module}/keys/key.pub")
}

# droplet
resource "digitalocean_droplet" "droplet" {
  image     = "ubuntu-18-04-x64"
  name      = var.droplet_name
  region    = "nyc1"
  size      = var.droplet_size
  user_data = data.template_file.init.rendered
  ssh_keys = [digitalocean_ssh_key.default.fingerprint]
}

# project
resource "digitalocean_project" "project" {
  name        = var.project_name
  description = "A University Project."
  purpose     = "Web Application"
  environment = "Production"
  resources   = [digitalocean_droplet.droplet.urn, digitalocean_domain.default.urn]
}