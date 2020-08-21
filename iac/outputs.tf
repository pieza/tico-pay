output "public_ip" {
  value = digitalocean_droplet.droplet.ipv4_address
}

output "www_fqdn" {
  value = digitalocean_record.www.fqdn  # => www.example.com
}