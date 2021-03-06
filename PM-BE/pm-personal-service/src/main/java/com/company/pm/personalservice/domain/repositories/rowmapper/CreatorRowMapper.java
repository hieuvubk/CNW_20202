package com.company.pm.personalservice.domain.repositories.rowmapper;

import com.company.pm.common.services.ColumnConverter;
import com.company.pm.domain.personalservice.Creator;
import io.r2dbc.spi.Row;
import org.springframework.stereotype.Service;

import java.util.function.BiFunction;

/**
 * Converter between {@link Row} to {@link Creator}, with proper type conversions.
 */
@Service
public class CreatorRowMapper implements BiFunction<Row, String, Creator> {

    private final ColumnConverter converter;

    public CreatorRowMapper(ColumnConverter converter) {
        this.converter = converter;
    }

    /**
     * Take a {@link Row} and a column prefix, and extract all the fields.
     * @return the {@link Creator} stored in the database.
     */
    @Override
    public Creator apply(Row row, String prefix) {
        Creator entity = Creator.builder().build();
        entity.setId(converter.fromRow(row, prefix + "_id", Long.class));
        entity.setName(converter.fromRow(row, prefix + "_name", String.class));
        entity.setProjectId(converter.fromRow(row, prefix + "_project_id", Long.class));
        return entity;
    }
}
