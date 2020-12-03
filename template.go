package main

import (
	"html/template"
	"path/filepath"
)

type Templates struct {
	base *template.Template
}

func (t *Templates) init(path string) error {
	var err error
	t.base, err = template.ParseFiles(filepath.Join(path, "base.html"))
	return err
}
