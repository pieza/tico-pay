resource "digitalocean_domain" "default" {
  name = var.domain
}

resource "digitalocean_record" "a" {
  domain = digitalocean_domain.default.name
  type   = "A"
  name   = "@"
  value  = digitalocean_droplet.droplet.ipv4_address
}

resource "digitalocean_record" "www" {
  domain = digitalocean_domain.default.name
  type   = "A"
  name   = "www"
  value  = digitalocean_droplet.droplet.ipv4_address
}