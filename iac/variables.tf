variable "token" {
  description = "Digital Ocean Auth Token"
  type        = string
}

variable "email" {
  description = "Contact email for ssl cert"
  type        = string
}


variable "domain" {
  description = "Domain name"
  type        = string
}

variable "droplet_name" {
  description = "Name of the droplet"
  type        = string
}

variable "droplet_size" {
  description = "Slug of the droplet size"
  type        = string
}

variable "project_name" {
  description = "Name of the project"
  type        = string
}

variable "app_port" {
  description = "TCP port of the aplication"
  type        = number
}